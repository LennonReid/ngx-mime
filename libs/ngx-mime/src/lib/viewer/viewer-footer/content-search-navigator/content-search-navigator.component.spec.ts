import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../../../testing/injected-stub';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { Rect } from '../../../core/models/rect';
import { ViewerLayout } from '../../../core/models/viewer-layout';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { CanvasServiceStub } from '../../../test/canvas-service-stub';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';
import { MimeViewerIntl } from './../../../core/intl';
import { Hit } from './../../../core/models/hit';
import { SearchResult } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { SharedModule } from './../../../shared/shared.module';
import { ViewerServiceStub } from './../../../test/viewer-service-stub';
import { ContentSearchNavigatorComponent } from './content-search-navigator.component';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;
  let iiifContentSearchService: IiifContentSearchServiceStub;
  let canvasService: CanvasServiceStub;
  let contentSearchNavigationService: ContentSearchNavigationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [ContentSearchNavigatorComponent],
      providers: [
        MimeViewerIntl,
        ContentSearchNavigationService,
        { provide: ViewerService, useClass: ViewerServiceStub },
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        { provide: CanvasService, useClass: CanvasServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    iiifContentSearchService = injectedStub(IiifContentSearchService);
    contentSearchNavigationService = TestBed.inject(
      ContentSearchNavigationService
    );
    canvasService = injectedStub(CanvasService);

    component = fixture.componentInstance;
    component.searchResult = createDefaultData();
    iiifContentSearchService._currentSearchResult.next(component.searchResult);
    canvasService.addAll(createDefaultTileRects(102), ViewerLayout.TWO_PAGE);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', inject(
    [MimeViewerIntl],
    (intl: MimeViewerIntl) => {
      const text = fixture.debugElement.query(
        By.css('[data-testid="footerNavigateNextHitButton"]')
      );
      expect(text.nativeElement.getAttribute('aria-label')).toContain(
        `Next Hit`
      );

      intl.nextHitLabel = 'New test string';
      intl.changes.next();
      fixture.detectChanges();
      expect(text.nativeElement.getAttribute('aria-label')).toContain(
        'New test string'
      );
    }
  ));

  describe('Two page display', () => {
    it('should go to first hit if current canvasgroup is 3 and user presses previous hit button', waitForAsync(() => {
      spyOn(
        contentSearchNavigationService,
        'goToPreviousHit'
      ).and.callThrough();
      canvasService.setCanvasGroupIndexChange(3);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHit();
        expect(
          contentSearchNavigationService.goToPreviousHit
        ).toHaveBeenCalledTimes(1);
        contentSearchNavigationService.currentHitCounter.subscribe(
          (hitIndex) => {
            expect(hitIndex).toBe(0);
          }
        );
      });
    }));

    it('should go to first hit if current canvas is 0 and user presses next hit button', waitForAsync(() => {
      spyOn(contentSearchNavigationService, 'goToNextHit').and.callThrough();
      canvasService.setCanvasGroupIndexChange(0);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToNextHit();
        expect(
          contentSearchNavigationService.goToNextHit
        ).toHaveBeenCalledTimes(1);
        contentSearchNavigationService.currentHitCounter.subscribe(
          (hitIndex) => {
            expect(hitIndex).toBe(0);
          }
        );
      });
    }));

    it('should disable previous button if on first hit', waitForAsync(() => {
      canvasService.setCanvasGroupIndexChange(2);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(
          By.css('[data-testid="footerNavigatePreviousHitButton"]')
        );
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }));

    it('should disable next button if on last hit', waitForAsync(() => {
      canvasService.setCanvasGroupIndexChange(51);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(
          By.css('[data-testid="footerNavigateNextHitButton"]')
        );
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }));

    it('should go to last hit on right page if user presses previous hit button when on canvasgroup 2', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');

      component.searchResult = createLeftPageHit();
      iiifContentSearchService._currentSearchResult.next(
        component.searchResult
      );
      canvasService.setCanvasGroupIndexChange(2);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 2, index: 2 })
        );
      });
    }));

    it('should go to first hit on current canvasgroup if no hits are selected and user presses next hit button', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');
      canvasService.setCanvasGroupIndexChange(4);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToNextHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 1, index: 8 })
        );
      });
    }));

    it('should go to first hit on current canvasgroup if no hits are selected and user presses previous hit button', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');
      canvasService.setCanvasGroupIndexChange(4);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 1, index: 8 })
        );
      });
    }));

    it('should go to next hit on same canvasgroup when user press next hit button', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');

      component.searchResult = createSinglePageHit();
      iiifContentSearchService._currentSearchResult.next(
        component.searchResult
      );
      canvasService.setCanvasGroupIndexChange(1);
      contentSearchNavigationService.selected(component.searchResult.get(0));
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToNextHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 1, index: 2 })
        );
      });
    }));

    it('should go to previous hit on same canvasgroup when user presses previous hit button', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');

      component.searchResult = createSinglePageHit();
      iiifContentSearchService._currentSearchResult.next(
        component.searchResult
      );
      canvasService.setCanvasGroupIndexChange(1);
      contentSearchNavigationService.selected(component.searchResult.get(1));
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 0, index: 2 })
        );
      });
    }));
  });

  describe('Single page display', () => {
    it('should go to first hit if user presses previous hit button', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');
      component.searchResult = createSinglePageHit();
      iiifContentSearchService._currentSearchResult.next(
        component.searchResult
      );
      canvasService.reset();
      canvasService.addAll(createDefaultTileRects(102), ViewerLayout.ONE_PAGE);
      canvasService.setCanvasGroupIndexChange(3);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 1, index: 2 })
        );
      });
    }));

    it('should go to next hit if user presses next hit button', waitForAsync(() => {
      spyOn(iiifContentSearchService, 'selected');
      canvasService.setCanvasGroupIndexChange(0);

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component.goToNextHit();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(
          new Hit({ id: 0, index: 1 })
        );
      });
    }));
  });

  function createDefaultTileRects(size: number): Rect[] {
    const tileRects: Rect[] = [];
    for (let i = 0; i < size; i++) {
      tileRects.push(new Rect());
    }
    return tileRects;
  }

  function createDefaultData() {
    const searchResult = new SearchResult();
    searchResult.add(
      new Hit({
        id: 0,
        index: 1,
      })
    );
    searchResult.add(
      new Hit({
        id: 1,
        index: 8,
      })
    );
    searchResult.add(
      new Hit({
        id: 2,
        index: 10,
      })
    );
    searchResult.add(
      new Hit({
        id: 3,
        index: 10,
      })
    );
    searchResult.add(
      new Hit({
        id: 4,
        index: 20,
      })
    );
    searchResult.add(
      new Hit({
        id: 5,
        index: 30,
      })
    );
    searchResult.add(
      new Hit({
        id: 6,
        index: 40,
      })
    );
    searchResult.add(
      new Hit({
        id: 7,
        index: 100,
      })
    );
    return searchResult;
  }

  function createLeftPageHit() {
    const searchResult = new SearchResult();
    searchResult.add(
      new Hit({
        id: 0,
        index: 1,
      })
    );
    searchResult.add(
      new Hit({
        id: 1,
        index: 1,
      })
    );
    searchResult.add(
      new Hit({
        id: 2,
        index: 2,
      })
    );

    return searchResult;
  }

  function createSinglePageHit() {
    const searchResult = new SearchResult();
    searchResult.add(
      new Hit({
        id: 0,
        index: 2,
      })
    );
    searchResult.add(
      new Hit({
        id: 1,
        index: 2,
      })
    );

    return searchResult;
  }
});

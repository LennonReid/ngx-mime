import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAutoSpy, Spy } from 'jasmine-auto-spies';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { SharedModule } from '../shared/shared.module';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { AttributionDialogComponent } from './attribution-dialog.component';

describe('AttributionDialogComponent', () => {
  let component: AttributionDialogComponent;
  let fixture: ComponentFixture<AttributionDialogComponent>;
  let iiifManifestServiceSpy: Spy<IiifManifestService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
      declarations: [AttributionDialogComponent],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(IiifManifestService, {
          observablePropsToSpyOn: ['currentManifest'],
        }),
        provideAutoSpy(AttributionDialogResizeService),
        provideAutoSpy(StyleService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(AccessKeysService),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionDialogComponent);
    component = fixture.componentInstance;
    iiifManifestServiceSpy = TestBed.inject<any>(IiifManifestService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display attribution', () => {
    iiifManifestServiceSpy.currentManifest.nextWith(
      new Manifest({
        attribution: 'This is a test attribution',
      })
    );

    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(
      By.css('.mat-mdc-dialog-content')
    );
    expect(attribution.nativeElement.innerText).toBe(
      'This is a test attribution'
    );
  });
});

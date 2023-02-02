import { animate, group, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewingDirection } from '../../core/models/viewing-direction';
import * as i0 from "@angular/core";
import * as i1 from "./../../core/intl";
import * as i2 from "./../../core/mime-resize-service/mime-resize.service";
import * as i3 from "./../../core/viewer-service/viewer.service";
import * as i4 from "./../../core/canvas-service/canvas-service";
import * as i5 from "../../core/style-service/style.service";
import * as i6 from "../../core/iiif-manifest-service/iiif-manifest-service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/flex-layout/flex";
import * as i9 from "@angular/flex-layout/extended";
import * as i10 from "@angular/material/button";
import * as i11 from "@angular/material/icon";
import * as i12 from "@angular/material/tooltip";
export class OsdToolbarComponent {
    constructor(intl, renderer, changeDetectorRef, mimeService, viewerService, canvasService, styleService, iiifManifestService) {
        this.intl = intl;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.mimeService = mimeService;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.styleService = styleService;
        this.iiifManifestService = iiifManifestService;
        this.osdToolbarStyle = {};
        this.numberOfCanvasGroups = 0;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.state = 'hide';
        this.invert = false;
        this.subscriptions = new Subscription();
    }
    get osdToolbarState() {
        return this.state;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.mimeService.onResize.subscribe((dimensions) => {
            this.osdToolbarStyle = {
                top: dimensions.top + 110 + 'px',
            };
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.viewerService.onCanvasGroupIndexChange.subscribe((currentCanvasGroupIndex) => {
            this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    ngAfterViewInit() {
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                const backgroundRgbaColor = this.styleService.convertToRgba(color, 0.3);
                this.renderer.setStyle(this.container.nativeElement, 'background-color', backgroundRgbaColor);
            }
        }));
    }
    zoomIn() {
        this.viewerService.zoomIn();
    }
    zoomOut() {
        this.viewerService.zoomOut();
    }
    home() {
        this.viewerService.home();
    }
    rotate() {
        this.viewerService.rotate();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
}
OsdToolbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: OsdToolbarComponent, deps: [{ token: i1.MimeViewerIntl }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i2.MimeResizeService }, { token: i3.ViewerService }, { token: i4.CanvasService }, { token: i5.StyleService }, { token: i6.IiifManifestService }], target: i0.ɵɵFactoryTarget.Component });
OsdToolbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: OsdToolbarComponent, selector: "mime-osd-toolbar", host: { properties: { "@osdToolbarState": "this.osdToolbarState" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], ngImport: i0, template: "<div #container class=\"osd-toolbar\" [ngStyle]=\"osdToolbarStyle\">\n  <div fxHide fxShow.gt-sm=\"true\">\n    <div\n      class=\"osd-toolbar-container\"\n      fxLayout=\"column\"\n      fxLayoutAlign=\"center center\"\n    >\n      <div class=\"osd-toolbar-row\"> </div>\n      <div class=\"osd-toolbar-row\">\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <button\n          (click)=\"home()\"\n          id=\"homeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.homeLabel\"\n          [matTooltip]=\"intl.homeLabel\"\n        >\n          <mat-icon>home</mat-icon>\n        </button>\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n      </div>\n\n      <div class=\"osd-toolbar-row\">\n        <button\n          (click)=\"zoomIn()\"\n          id=\"zoomInButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomInLabel\"\n          [matTooltip]=\"intl.zoomInLabel\"\n        >\n          <mat-icon>zoom_in</mat-icon>\n        </button>\n\n        <button\n          (click)=\"rotate()\"\n          id=\"rotateButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.rotateCwLabel\"\n          [matTooltip]=\"intl.rotateCwLabel\"\n        >\n          <mat-icon>rotate_right</mat-icon>\n        </button>\n        <button\n          (click)=\"zoomOut()\"\n          id=\"zoomOutButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomOutLabel\"\n          [matTooltip]=\"intl.zoomOutLabel\"\n        >\n          <mat-icon>zoom_out</mat-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [":host{z-index:2}::ng-deep .osd-toolbar-row>.mat-toolbar-row{height:40px}.osd-toolbar{position:absolute;background:transparent;width:auto;border-radius:8px;margin-left:16px}\n"], dependencies: [{ kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i7.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i8.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i8.DefaultLayoutAlignDirective, selector: "  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]", inputs: ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"] }, { kind: "directive", type: i9.DefaultShowHideDirective, selector: "  [fxShow], [fxShow.print],  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],  [fxHide], [fxHide.print],  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]", inputs: ["fxShow", "fxShow.print", "fxShow.xs", "fxShow.sm", "fxShow.md", "fxShow.lg", "fxShow.xl", "fxShow.lt-sm", "fxShow.lt-md", "fxShow.lt-lg", "fxShow.lt-xl", "fxShow.gt-xs", "fxShow.gt-sm", "fxShow.gt-md", "fxShow.gt-lg", "fxHide", "fxHide.print", "fxHide.xs", "fxHide.sm", "fxHide.md", "fxHide.lg", "fxHide.xl", "fxHide.lt-sm", "fxHide.lt-md", "fxHide.lt-lg", "fxHide.lt-xl", "fxHide.gt-xs", "fxHide.gt-sm", "fxHide.gt-md", "fxHide.gt-lg"] }, { kind: "directive", type: i9.DefaultStyleDirective, selector: "  [ngStyle],  [ngStyle.xs], [ngStyle.sm], [ngStyle.md], [ngStyle.lg], [ngStyle.xl],  [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],  [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]", inputs: ["ngStyle", "ngStyle.xs", "ngStyle.sm", "ngStyle.md", "ngStyle.lg", "ngStyle.xl", "ngStyle.lt-sm", "ngStyle.lt-md", "ngStyle.lt-lg", "ngStyle.lt-xl", "ngStyle.gt-xs", "ngStyle.gt-sm", "ngStyle.gt-md", "ngStyle.gt-lg"] }, { kind: "component", type: i10.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i11.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i12.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], animations: [
        trigger('osdToolbarState', [
            state('hide', style({
                transform: 'translate(-120px, 0)',
                display: 'none',
            })),
            state('show', style({
                transform: 'translate(0px, 0px)',
                display: 'block',
            })),
            transition('hide => show', [
                group([
                    style({ display: 'block' }),
                    animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
                ]),
            ]),
            transition('show => hide', animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: OsdToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-osd-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('osdToolbarState', [
                            state('hide', style({
                                transform: 'translate(-120px, 0)',
                                display: 'none',
                            })),
                            state('show', style({
                                transform: 'translate(0px, 0px)',
                                display: 'block',
                            })),
                            transition('hide => show', [
                                group([
                                    style({ display: 'block' }),
                                    animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
                                ]),
                            ]),
                            transition('show => hide', animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)),
                        ]),
                    ], template: "<div #container class=\"osd-toolbar\" [ngStyle]=\"osdToolbarStyle\">\n  <div fxHide fxShow.gt-sm=\"true\">\n    <div\n      class=\"osd-toolbar-container\"\n      fxLayout=\"column\"\n      fxLayoutAlign=\"center center\"\n    >\n      <div class=\"osd-toolbar-row\"> </div>\n      <div class=\"osd-toolbar-row\">\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <button\n          (click)=\"home()\"\n          id=\"homeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.homeLabel\"\n          [matTooltip]=\"intl.homeLabel\"\n        >\n          <mat-icon>home</mat-icon>\n        </button>\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n      </div>\n\n      <div class=\"osd-toolbar-row\">\n        <button\n          (click)=\"zoomIn()\"\n          id=\"zoomInButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomInLabel\"\n          [matTooltip]=\"intl.zoomInLabel\"\n        >\n          <mat-icon>zoom_in</mat-icon>\n        </button>\n\n        <button\n          (click)=\"rotate()\"\n          id=\"rotateButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.rotateCwLabel\"\n          [matTooltip]=\"intl.rotateCwLabel\"\n        >\n          <mat-icon>rotate_right</mat-icon>\n        </button>\n        <button\n          (click)=\"zoomOut()\"\n          id=\"zoomOutButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomOutLabel\"\n          [matTooltip]=\"intl.zoomOutLabel\"\n        >\n          <mat-icon>zoom_out</mat-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [":host{z-index:2}::ng-deep .osd-toolbar-row>.mat-toolbar-row{height:40px}.osd-toolbar{position:absolute;background:transparent;width:auto;border-radius:8px;margin-left:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.MimeResizeService }, { type: i3.ViewerService }, { type: i4.CanvasService }, { type: i5.StyleService }, { type: i6.IiifManifestService }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], osdToolbarState: [{
                type: HostBinding,
                args: ['@osdToolbarState']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NkLXRvb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFdBQVcsRUFJWCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBMEN2RSxNQUFNLE9BQU8sbUJBQW1CO0lBYzlCLFlBQ1MsSUFBb0IsRUFDbkIsUUFBbUIsRUFDbkIsaUJBQW9DLEVBQ3BDLFdBQThCLEVBQzlCLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLG1CQUF3QztRQVB6QyxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQzlCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdB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QUFDLGtCQUFrQixhQUFhLENBQUM7aUJBQ3RFLENBQUM7YUFDSCxDQUFDO1lBQ0YsVUFBVSxDQUNSLGNBQWMsRUFDZCxPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixZQUFZLENBQUMsQ0FDdEU7U0FDRixDQUFDO0tBQ0g7MkZBRVUsbUJBQW1CO2tCQWxDL0IsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTSxjQUNuQzt3QkFDVixPQUFPLENBQUMsaUJBQWlCLEVBQUU7NEJBQ3pCLEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDO2dDQUNKLFNBQVMsRUFBRSxzQkFBc0I7Z0NBQ2pDLE9BQU8sRUFBRSxNQUFNOzZCQUNoQixDQUFDLENBQ0g7NEJBQ0QsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7Z0NBQ0osU0FBUyxFQUFFLHFCQUFxQjtnQ0FDaEMsT0FBTyxFQUFFLE9BQU87NkJBQ2pCLENBQUMsQ0FDSDs0QkFDRCxVQUFVLENBQUMsY0FBYyxFQUFFO2dDQUN6QixLQUFLLENBQUM7b0NBQ0osS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO29DQUMzQixPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLGtCQUFrQixhQUFhLENBQUM7aUNBQ3RFLENBQUM7NkJBQ0gsQ0FBQzs0QkFDRixVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLFlBQVksQ0FBQyxDQUN0RTt5QkFDRixDQUFDO3FCQUNIO2tUQUd5QyxTQUFTO3NCQUFsRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRXBDLGVBQWU7c0JBRGxCLFdBQVc7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgZ3JvdXAsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvcmUvY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uLy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1vc2QtdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9vc2QtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL29zZC10b29sYmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignb3NkVG9vbGJhclN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdoaWRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtMTIwcHgsIDApJyxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdzaG93JyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLFxuICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignaGlkZSA9PiBzaG93JywgW1xuICAgICAgICBncm91cChbXG4gICAgICAgICAgc3R5bGUoeyBkaXNwbGF5OiAnYmxvY2snIH0pLFxuICAgICAgICAgIGFuaW1hdGUoYCR7Vmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy50b29sYmFyc0Vhc2VJblRpbWV9bXMgZWFzZS1vdXRgKSxcbiAgICAgICAgXSksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKGAke1ZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZX1tcyBlYXNlLWluYClcbiAgICAgICksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9zZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG4gIEBIb3N0QmluZGluZygnQG9zZFRvb2xiYXJTdGF0ZScpXG4gIGdldCBvc2RUb29sYmFyU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cbiAgcHVibGljIG9zZFRvb2xiYXJTdHlsZSA9IHt9O1xuICBwdWJsaWMgbnVtYmVyT2ZDYW52YXNHcm91cHMgPSAwO1xuICBwdWJsaWMgaXNGaXJzdENhbnZhc0dyb3VwID0gZmFsc2U7XG4gIHB1YmxpYyBpc0xhc3RDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGUgPSAnaGlkZSc7XG4gIGludmVydCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG1pbWVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmludmVydCA9IG1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uTFRSO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1pbWVTZXJ2aWNlLm9uUmVzaXplLnN1YnNjcmliZSgoZGltZW5zaW9uczogRGltZW5zaW9ucykgPT4ge1xuICAgICAgICB0aGlzLm9zZFRvb2xiYXJTdHlsZSA9IHtcbiAgICAgICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgMTEwICsgJ3B4JyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyA9IHRoaXMuY2FudmFzU2VydmljZS5udW1iZXJPZkNhbnZhc0dyb3VwcztcbiAgICAgICAgICB0aGlzLmlzRmlyc3RDYW52YXNHcm91cCA9IHRoaXMuaXNPbkZpcnN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5pc0xhc3RDYW52YXNHcm91cCA9IHRoaXMuaXNPbkxhc3RDYW52YXNHcm91cChcbiAgICAgICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5pbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5zdHlsZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIGNvbnN0IGJhY2tncm91bmRSZ2JhQ29sb3IgPSB0aGlzLnN0eWxlU2VydmljZS5jb252ZXJ0VG9SZ2JhKFxuICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAwLjNcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InLFxuICAgICAgICAgICAgYmFja2dyb3VuZFJnYmFDb2xvclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHpvb21JbigpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2Uuem9vbUluKCk7XG4gIH1cblxuICB6b29tT3V0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS56b29tT3V0KCk7XG4gIH1cblxuICBob21lKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5ob21lKCk7XG4gIH1cblxuICByb3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnJvdGF0ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub05leHRDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub05leHRDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc09uRmlyc3RDYW52YXNHcm91cChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID09PSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBpc09uTGFzdENhbnZhc0dyb3VwKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY3VycmVudENhbnZhc0dyb3VwSW5kZXggPT09IHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxO1xuICB9XG59XG4iLCI8ZGl2ICNjb250YWluZXIgY2xhc3M9XCJvc2QtdG9vbGJhclwiIFtuZ1N0eWxlXT1cIm9zZFRvb2xiYXJTdHlsZVwiPlxuICA8ZGl2IGZ4SGlkZSBmeFNob3cuZ3Qtc209XCJ0cnVlXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJvc2QtdG9vbGJhci1jb250YWluZXJcIlxuICAgICAgZnhMYXlvdXQ9XCJjb2x1bW5cIlxuICAgICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJvc2QtdG9vbGJhci1yb3dcIj4gPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwib3NkLXRvb2xiYXItcm93XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbnZlcnRcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBpZD1cIm5hdmlnYXRlQmVmb3JlQnV0dG9uXCJcbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLnByZXZpb3VzUGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzRmlyc3RDYW52YXNHcm91cFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX2JlZm9yZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWludmVydFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGlkPVwibmF2aWdhdGVOZXh0QnV0dG9uXCJcbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0xhc3RDYW52YXNHcm91cFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZ29Ub05leHRDYW52YXNHcm91cCgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfYmVmb3JlPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAoY2xpY2spPVwiaG9tZSgpXCJcbiAgICAgICAgICBpZD1cImhvbWVCdXR0b25cIlxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5ob21lTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuaG9tZUxhYmVsXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbnZlcnRcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBpZD1cIm5hdmlnYXRlTmV4dEJ1dHRvblwiXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNMYXN0Q2FudmFzR3JvdXBcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9OZXh0Q2FudmFzR3JvdXAoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX25leHQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpbnZlcnRcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBpZD1cIm5hdmlnYXRlQmVmb3JlQnV0dG9uXCJcbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLnByZXZpb3VzUGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzRmlyc3RDYW52YXNHcm91cFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX25leHQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwib3NkLXRvb2xiYXItcm93XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAoY2xpY2spPVwiem9vbUluKClcIlxuICAgICAgICAgIGlkPVwiem9vbUluQnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuem9vbUluTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuem9vbUluTGFiZWxcIlxuICAgICAgICA+XG4gICAgICAgICAgPG1hdC1pY29uPnpvb21faW48L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKGNsaWNrKT1cInJvdGF0ZSgpXCJcbiAgICAgICAgICBpZD1cInJvdGF0ZUJ1dHRvblwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLnJvdGF0ZUN3TGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwucm90YXRlQ3dMYWJlbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+cm90YXRlX3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAoY2xpY2spPVwiem9vbU91dCgpXCJcbiAgICAgICAgICBpZD1cInpvb21PdXRCdXR0b25cIlxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC56b29tT3V0TGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuem9vbU91dExhYmVsXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj56b29tX291dDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { StyleService } from '../../core/style-service/style.service';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../core/intl';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
export declare class OsdToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
    intl: MimeViewerIntl;
    private renderer;
    private breakpointObserver;
    private changeDetectorRef;
    private mimeService;
    private viewerService;
    private canvasService;
    private styleService;
    private iiifManifestService;
    container: ElementRef;
    get osdToolbarState(): string;
    osdToolbarStyle: {};
    numberOfCanvasGroups: number;
    isFirstCanvasGroup: boolean;
    isLastCanvasGroup: boolean;
    state: string;
    invert: boolean;
    isWeb: boolean;
    private subscriptions;
    constructor(intl: MimeViewerIntl, renderer: Renderer2, breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef, mimeService: MimeResizeService, viewerService: ViewerService, canvasService: CanvasService, styleService: StyleService, iiifManifestService: IiifManifestService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    zoomIn(): void;
    zoomOut(): void;
    home(): void;
    rotate(): void;
    ngOnDestroy(): void;
    goToPreviousCanvasGroup(): void;
    goToNextCanvasGroup(): void;
    private isOnFirstCanvasGroup;
    private isOnLastCanvasGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<OsdToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OsdToolbarComponent, "mime-osd-toolbar", never, {}, {}, never, never, false, never>;
}

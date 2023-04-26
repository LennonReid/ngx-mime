import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { CanvasGroupDialogService } from '../canvas-group-dialog/canvas-group-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { RecognizedTextMode, ViewerMode } from '../core/models';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { InformationDialogService } from '../information-dialog/information-dialog.service';
import { ViewDialogService } from '../view-dialog/view-dialog.service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import * as i0 from "@angular/core";
export declare class ViewerComponent implements OnInit, OnDestroy, OnChanges {
    snackBar: MatSnackBar;
    intl: MimeViewerIntl;
    private iiifManifestService;
    private viewDialogService;
    private informationDialogService;
    private attributionDialogService;
    private contentSearchDialogService;
    private helpDialogService;
    private viewerService;
    private resizeService;
    private changeDetectorRef;
    private modeService;
    private iiifContentSearchService;
    private accessKeysHandlerService;
    private canvasService;
    private viewerLayoutService;
    private styleService;
    private altoService;
    private zone;
    private platform;
    manifestUri: string;
    q: string;
    canvasIndex: number;
    config: MimeViewerConfig;
    tabIndex: number;
    viewerModeChanged: EventEmitter<ViewerMode>;
    canvasChanged: EventEmitter<number>;
    qChanged: EventEmitter<string>;
    manifestChanged: EventEmitter<Manifest>;
    recognizedTextContentModeChanged: EventEmitter<RecognizedTextMode>;
    recognizedTextMode: typeof RecognizedTextMode;
    id: string;
    openseadragonId: string;
    private subscriptions;
    private isCanvasPressed;
    private currentManifest;
    private viewerLayout;
    private viewerState;
    recognizedTextContentMode: RecognizedTextMode;
    showHeaderAndFooterState: string;
    errorMessage: string | null;
    private header;
    private footer;
    private osdToolbar;
    constructor(snackBar: MatSnackBar, intl: MimeViewerIntl, iiifManifestService: IiifManifestService, viewDialogService: ViewDialogService, informationDialogService: InformationDialogService, attributionDialogService: AttributionDialogService, contentSearchDialogService: ContentSearchDialogService, helpDialogService: HelpDialogService, viewerService: ViewerService, resizeService: MimeResizeService, changeDetectorRef: ChangeDetectorRef, modeService: ModeService, iiifContentSearchService: IiifContentSearchService, accessKeysHandlerService: AccessKeysService, canvasService: CanvasService, viewerLayoutService: ViewerLayoutService, styleService: StyleService, altoService: AltoService, zone: NgZone, platform: Platform, canvasGroupDialogService: CanvasGroupDialogService, el: ElementRef, viewContainerRef: ViewContainerRef);
    get mimeHeaderBeforeRef(): ViewContainerRef;
    get mimeHeaderAfterRef(): ViewContainerRef;
    get mimeFooterBeforeRef(): ViewContainerRef;
    get mimeFooterAfterRef(): ViewContainerRef;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    handleKeys(event: KeyboardEvent): void;
    onDrop(event: any): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): void;
    ngOnDestroy(): void;
    toggleToolbarsState(mode: ViewerMode): void;
    private loadManifest;
    private initialize;
    private cleanup;
    private resetCurrentManifest;
    private resetErrorMessage;
    private hasMixBlendModeSupport;
    goToHomeZoom(): void;
    setClasses(): {
        'mode-page': boolean;
        'mode-page-zoomed': boolean;
        'mode-dashboard': boolean;
        'layout-one-page': boolean;
        'layout-two-page': boolean;
        'canvas-pressed': boolean;
        'broken-mix-blend-mode': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewerComponent, "mime-viewer", never, { "manifestUri": "manifestUri"; "q": "q"; "canvasIndex": "canvasIndex"; "config": "config"; "tabIndex": "tabIndex"; }, { "viewerModeChanged": "viewerModeChanged"; "canvasChanged": "canvasChanged"; "qChanged": "qChanged"; "manifestChanged": "manifestChanged"; "recognizedTextContentModeChanged": "recognizedTextContentModeChanged"; }, never, never, false, never>;
}

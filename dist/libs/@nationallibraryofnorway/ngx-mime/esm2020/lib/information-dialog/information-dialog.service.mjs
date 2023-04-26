import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { InformationDialogComponent } from './information-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./information-dialog-config-strategy-factory";
import * as i3 from "../core/mime-resize-service/mime-resize.service";
export class InformationDialogService {
    constructor(dialog, informationDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.informationDialogConfigStrategyFactory = informationDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
                this.dialogRef?.updateSize(config.width, config.height);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open(selectedIndex) {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(InformationDialogComponent, config);
            if (selectedIndex) {
                this.dialogRef.componentInstance.selectedIndex = selectedIndex;
            }
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getSelectedIndex() {
        return this.dialogRef?.componentInstance?.selectedIndex ?? 0;
    }
    getDialogConfig() {
        if (!this._el || !this._viewContainerRef) {
            throw new Error('No element or viewContainerRef');
        }
        return this.informationDialogConfigStrategyFactory
            .create()
            .getConfig(this._el, this._viewContainerRef);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
InformationDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogService, deps: [{ token: i1.MatDialog }, { token: i2.InformationDialogConfigStrategyFactory }, { token: i3.MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable });
InformationDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: i2.InformationDialogConfigStrategyFactory }, { type: i3.MimeResizeService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvaW5mb3JtYXRpb24tZGlhbG9nL2luZm9ybWF0aW9uLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBT3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHcEMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7O0FBRzVFLE1BQU0sT0FBTyx3QkFBd0I7SUFNbkMsWUFDVSxNQUFpQixFQUNqQixzQ0FBOEUsRUFDOUUsaUJBQW9DO1FBRnBDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsMkNBQXNDLEdBQXRDLHNDQUFzQyxDQUF3QztRQUM5RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzNDLENBQUM7SUFFRyxVQUFVO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksRUFBRSxDQUFDLEVBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksZ0JBQWdCLENBQUMsZ0JBQWtDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztJQUM1QyxDQUFDO0lBRU0sSUFBSSxDQUFDLGFBQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFdEUsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzthQUNoRTtTQUNGO0lBQ0gsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQ0FBd0IsQ0FBQztJQUM1RCxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNuRDtRQUVELE9BQU8sSUFBSSxDQUFDLHNDQUFzQzthQUMvQyxNQUFNLEVBQUU7YUFDUixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7O3FIQWpGVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNYXREaWFsb2dDb25maWcsXG4gIE1hdERpYWxvZ1JlZixcbiAgTWF0RGlhbG9nU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2luZm9ybWF0aW9uLWRpYWxvZy1jb25maWctc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vaW5mb3JtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2Uge1xuICBwcml2YXRlIF9lbDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBkaWFsb2dSZWY/OiBNYXREaWFsb2dSZWY8SW5mb3JtYXRpb25EaWFsb2dDb21wb25lbnQ+O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIGluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5OiBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSxcbiAgICBwcml2YXRlIG1pbWVSZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1pbWVSZXNpemVTZXJ2aWNlLm9uUmVzaXplLnN1YnNjcmliZSgocmVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWY/LnVwZGF0ZVBvc2l0aW9uKGNvbmZpZy5wb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWY/LnVwZGF0ZVNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBzZXQgdmlld0NvbnRhaW5lclJlZih2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gIH1cblxuICBwdWJsaWMgb3BlbihzZWxlY3RlZEluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEluZm9ybWF0aW9uRGlhbG9nQ29tcG9uZW50LCBjb25maWcpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmPy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4oKSA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3BlbigpO1xuICB9XG5cbiAgcHVibGljIGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2dSZWY/LmdldFN0YXRlKCkgPT09IE1hdERpYWxvZ1N0YXRlLk9QRU47XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRpYWxvZ1JlZj8uY29tcG9uZW50SW5zdGFuY2U/LnNlbGVjdGVkSW5kZXggPz8gMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGlhbG9nQ29uZmlnKCk6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgaWYgKCF0aGlzLl9lbCB8fCAhdGhpcy5fdmlld0NvbnRhaW5lclJlZikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50IG9yIHZpZXdDb250YWluZXJSZWYnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeVxuICAgICAgLmNyZWF0ZSgpXG4gICAgICAuZ2V0Q29uZmlnKHRoaXMuX2VsLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=
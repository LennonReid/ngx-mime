import * as d3 from 'd3';
import * as OpenSeadragon from 'openseadragon';
import { Subscription } from 'rxjs';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';
export class CanvasGroupMask {
    constructor(viewer, styleService) {
        this.styleService = styleService;
        this.canvasGroupRect = new Rect();
        this.disableResize = false;
        this.animationHandler = () => {
            this.resize();
        };
        this.resizeHandler = () => {
            this.setCenter();
            this.resize();
        };
        this.canvasGroupPinchHandler = () => {
            this.disableResize = false;
        };
        this.canvasGroupDragHandler = (e) => {
            if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
                this.disableResize = true;
            }
        };
        this.canvasGroupDragEndHandler = () => {
            this.disableResize = false;
            this.resize();
        };
        this.viewer = viewer;
    }
    initialize(pageBounds, visible) {
        this.unsubscribe();
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                this.backgroundColor = color;
                if (this.leftMask) {
                    this.leftMask.style('fill', this.backgroundColor);
                }
                if (this.rightMask) {
                    this.rightMask.style('fill', this.backgroundColor);
                }
            }
        }));
        this.canvasGroupRect = pageBounds;
        this.addCanvasGroupMask();
        this.setCenter();
        this.resize();
        if (visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    destroy() {
        this.unsubscribe();
    }
    changeCanvasGroup(pageBounds) {
        this.canvasGroupRect = pageBounds;
        this.resize();
    }
    show() {
        this.addHandlers();
        if (!this.leftMask || !this.rightMask) {
            return;
        }
        this.setCenter();
        this.resize();
        this.leftMask.attr('height', '100%');
        this.rightMask.attr('height', '100%');
    }
    hide() {
        this.removeHandlers();
        if (!this.leftMask || !this.rightMask) {
            return;
        }
        this.leftMask.attr('height', '0');
        this.rightMask.attr('height', '0');
    }
    addHandlers() {
        this.viewer.addHandler('animation', this.animationHandler);
        this.viewer.addHandler('resize', this.resizeHandler);
        this.viewer.addHandler('canvas-pinch', this.canvasGroupPinchHandler);
        this.viewer.addHandler('canvas-drag', this.canvasGroupDragHandler);
        this.viewer.addHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
    }
    removeHandlers() {
        this.viewer.removeHandler('animation', this.animationHandler);
        this.viewer.removeHandler('resize', this.resizeHandler);
        this.viewer.removeHandler('canvas-pinch', this.canvasGroupPinchHandler);
        this.viewer.removeHandler('canvas-drag', this.canvasGroupDragHandler);
        this.viewer.removeHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
    }
    addCanvasGroupMask() {
        const overlays = d3.select(this.viewer.svgOverlay().node().parentNode);
        const mask = overlays.append('g').attr('data-testid', 'page-mask');
        this.leftMask = mask
            .append('rect')
            .attr('data-testid', 'mime-left-page-mask')
            .attr('height', '100%')
            .attr('y', 0)
            .style('fill', this.backgroundColor);
        this.rightMask = mask
            .append('rect')
            .attr('data-testid', 'mime-right-page-mask')
            .attr('height', '100%')
            .attr('y', 0)
            .style('fill', this.backgroundColor);
    }
    setCenter() {
        this.center = new OpenSeadragon.Point(this.viewer.viewport._containerInnerSize.x / 2, this.viewer.viewport._containerInnerSize.y / 2);
    }
    resize() {
        if (this.disableResize || !this.leftMask || !this.rightMask) {
            return;
        }
        const leftMaskRect = this.getLeftMaskRect();
        const rightMaskRect = this.getRightMaskRect();
        this.leftMask.attr('width', leftMaskRect.width).attr('x', leftMaskRect.x);
        this.rightMask
            .attr('width', rightMaskRect.width)
            .attr('x', Math.round(rightMaskRect.x));
    }
    getLeftMaskRect() {
        const imgBounds = new OpenSeadragon.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
        const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopLeft());
        let width = topLeft.x - ViewerOptions.overlays.canvasGroupMarginInPageView;
        if (width < 0) {
            width = 0;
        }
        return new Rect({
            x: 0,
            width: width,
        });
    }
    getRightMaskRect() {
        const imgBounds = new OpenSeadragon.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
        const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopRight());
        let width = this.viewer.viewport._containerInnerSize.x - topRight.x;
        const x = this.viewer.viewport._containerInnerSize.x -
            width +
            ViewerOptions.overlays.canvasGroupMarginInPageView;
        if (width < 0) {
            width = 0;
        }
        return new Rect({
            x: x,
            width: width,
        });
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLW1hc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS9jYW52YXMtZ3JvdXAtbWFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHekQsTUFBTSxPQUFPLGVBQWU7SUFhMUIsWUFBWSxNQUFXLEVBQVUsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFYM0Qsb0JBQWUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBSzdCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBMEZkLHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRU0sa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFTSw0QkFBdUIsR0FBRyxHQUFHLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDO1FBRU0sMkJBQXNCLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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QUFDLE1BQU0sQ0FDNUIsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUN0RSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQ3hCLENBQUM7UUFDRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsR0FDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFDLEtBQUs7WUFDTCxhQUFhLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDO1FBRXJELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtRQUVELE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDZCxDQUFDLEVBQUUsQ0FBQztZQUNKLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQgKiBhcyBPcGVuU2VhZHJhZ29uIGZyb20gJ29wZW5zZWFkcmFnb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzR3JvdXBNYXNrIHtcbiAgdmlld2VyOiBhbnk7XG4gIGNhbnZhc0dyb3VwUmVjdCA9IG5ldyBSZWN0KCk7XG5cbiAgbGVmdE1hc2s6IGFueTtcbiAgcmlnaHRNYXNrOiBhbnk7XG5cbiAgZGlzYWJsZVJlc2l6ZSA9IGZhbHNlO1xuICBjZW50ZXIhOiBQb2ludDtcblxuICBiYWNrZ3JvdW5kQ29sb3IhOiBzdHJpbmc7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyE6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih2aWV3ZXI6IGFueSwgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSkge1xuICAgIHRoaXMudmlld2VyID0gdmlld2VyO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUocGFnZUJvdW5kczogUmVjdCwgdmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5zdHlsZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgICAgICAgaWYgKHRoaXMubGVmdE1hc2spIHtcbiAgICAgICAgICAgIHRoaXMubGVmdE1hc2suc3R5bGUoJ2ZpbGwnLCB0aGlzLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLnJpZ2h0TWFzaykge1xuICAgICAgICAgICAgdGhpcy5yaWdodE1hc2suc3R5bGUoJ2ZpbGwnLCB0aGlzLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwUmVjdCA9IHBhZ2VCb3VuZHM7XG5cbiAgICB0aGlzLmFkZENhbnZhc0dyb3VwTWFzaygpO1xuXG4gICAgdGhpcy5zZXRDZW50ZXIoKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuXG4gICAgaWYgKHZpc2libGUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlQ2FudmFzR3JvdXAocGFnZUJvdW5kczogUmVjdCkge1xuICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0ID0gcGFnZUJvdW5kcztcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9XG5cbiAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5hZGRIYW5kbGVycygpO1xuICAgIGlmICghdGhpcy5sZWZ0TWFzayB8fCAhdGhpcy5yaWdodE1hc2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRDZW50ZXIoKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIHRoaXMubGVmdE1hc2suYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcbiAgICB0aGlzLnJpZ2h0TWFzay5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuICB9XG5cbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVIYW5kbGVycygpO1xuICAgIGlmICghdGhpcy5sZWZ0TWFzayB8fCAhdGhpcy5yaWdodE1hc2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sZWZ0TWFzay5hdHRyKCdoZWlnaHQnLCAnMCcpO1xuICAgIHRoaXMucmlnaHRNYXNrLmF0dHIoJ2hlaWdodCcsICcwJyk7XG4gIH1cblxuICBwcml2YXRlIGFkZEhhbmRsZXJzKCkge1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbicsIHRoaXMuYW5pbWF0aW9uSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcGluY2gnLCB0aGlzLmNhbnZhc0dyb3VwUGluY2hIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtZHJhZycsIHRoaXMuY2FudmFzR3JvdXBEcmFnSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgdGhpcy5jYW52YXNHcm91cERyYWdFbmRIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlSGFuZGxlcnMoKSB7XG4gICAgdGhpcy52aWV3ZXIucmVtb3ZlSGFuZGxlcignYW5pbWF0aW9uJywgdGhpcy5hbmltYXRpb25IYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5yZW1vdmVIYW5kbGVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLnJlbW92ZUhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMuY2FudmFzR3JvdXBQaW5jaEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLnJlbW92ZUhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgdGhpcy5jYW52YXNHcm91cERyYWdIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5yZW1vdmVIYW5kbGVyKFxuICAgICAgJ2NhbnZhcy1kcmFnLWVuZCcsXG4gICAgICB0aGlzLmNhbnZhc0dyb3VwRHJhZ0VuZEhhbmRsZXJcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRpb25IYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0Q2VudGVyKCk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfTtcblxuICBwcml2YXRlIGNhbnZhc0dyb3VwUGluY2hIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuZGlzYWJsZVJlc2l6ZSA9IGZhbHNlO1xuICB9O1xuXG4gIHByaXZhdGUgY2FudmFzR3JvdXBEcmFnSGFuZGxlciA9IChlOiBhbnkpID0+IHtcbiAgICBpZiAoKGUuZGVsdGEueCB8fCBlLmRlbHRhLnkpICYmIGUuc3BlZWQgPiAwICYmIGUuZGlyZWN0aW9uICE9PSAwKSB7XG4gICAgICB0aGlzLmRpc2FibGVSZXNpemUgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGNhbnZhc0dyb3VwRHJhZ0VuZEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5kaXNhYmxlUmVzaXplID0gZmFsc2U7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfTtcblxuICBwcml2YXRlIGFkZENhbnZhc0dyb3VwTWFzaygpIHtcbiAgICBjb25zdCBvdmVybGF5cyA9IGQzLnNlbGVjdCh0aGlzLnZpZXdlci5zdmdPdmVybGF5KCkubm9kZSgpLnBhcmVudE5vZGUpO1xuXG4gICAgY29uc3QgbWFzayA9IG92ZXJsYXlzLmFwcGVuZCgnZycpLmF0dHIoJ2RhdGEtdGVzdGlkJywgJ3BhZ2UtbWFzaycpO1xuXG4gICAgdGhpcy5sZWZ0TWFzayA9IG1hc2tcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ2RhdGEtdGVzdGlkJywgJ21pbWUtbGVmdC1wYWdlLW1hc2snKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuYmFja2dyb3VuZENvbG9yKTtcblxuICAgIHRoaXMucmlnaHRNYXNrID0gbWFza1xuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignZGF0YS10ZXN0aWQnLCAnbWltZS1yaWdodC1wYWdlLW1hc2snKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuYmFja2dyb3VuZENvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2VudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuY2VudGVyID0gbmV3IE9wZW5TZWFkcmFnb24uUG9pbnQoXG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5fY29udGFpbmVySW5uZXJTaXplLnggLyAyLFxuICAgICAgdGhpcy52aWV3ZXIudmlld3BvcnQuX2NvbnRhaW5lcklubmVyU2l6ZS55IC8gMlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUmVzaXplIHx8ICF0aGlzLmxlZnRNYXNrIHx8ICF0aGlzLnJpZ2h0TWFzaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnRNYXNrUmVjdCA9IHRoaXMuZ2V0TGVmdE1hc2tSZWN0KCk7XG4gICAgY29uc3QgcmlnaHRNYXNrUmVjdCA9IHRoaXMuZ2V0UmlnaHRNYXNrUmVjdCgpO1xuICAgIHRoaXMubGVmdE1hc2suYXR0cignd2lkdGgnLCBsZWZ0TWFza1JlY3Qud2lkdGgpLmF0dHIoJ3gnLCBsZWZ0TWFza1JlY3QueCk7XG4gICAgdGhpcy5yaWdodE1hc2tcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHJpZ2h0TWFza1JlY3Qud2lkdGgpXG4gICAgICAuYXR0cigneCcsIE1hdGgucm91bmQocmlnaHRNYXNrUmVjdC54KSk7XG4gIH1cblxuICBwcml2YXRlIGdldExlZnRNYXNrUmVjdCgpOiBSZWN0IHtcbiAgICBjb25zdCBpbWdCb3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgdGhpcy5jYW52YXNHcm91cFJlY3QueCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LnksXG4gICAgICB0aGlzLmNhbnZhc0dyb3VwUmVjdC53aWR0aCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LmhlaWdodFxuICAgICk7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMudmlld2VyLnZpZXdwb3J0LnZpZXdwb3J0VG9WaWV3ZXJFbGVtZW50Q29vcmRpbmF0ZXMoXG4gICAgICBpbWdCb3VuZHMuZ2V0VG9wTGVmdCgpXG4gICAgKTtcbiAgICBsZXQgd2lkdGggPSB0b3BMZWZ0LnggLSBWaWV3ZXJPcHRpb25zLm92ZXJsYXlzLmNhbnZhc0dyb3VwTWFyZ2luSW5QYWdlVmlldztcblxuICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgIHdpZHRoID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlY3Qoe1xuICAgICAgeDogMCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmlnaHRNYXNrUmVjdCgpOiBSZWN0IHtcbiAgICBjb25zdCBpbWdCb3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgdGhpcy5jYW52YXNHcm91cFJlY3QueCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LnksXG4gICAgICB0aGlzLmNhbnZhc0dyb3VwUmVjdC53aWR0aCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LmhlaWdodFxuICAgICk7XG4gICAgY29uc3QgdG9wUmlnaHQgPSB0aGlzLnZpZXdlci52aWV3cG9ydC52aWV3cG9ydFRvVmlld2VyRWxlbWVudENvb3JkaW5hdGVzKFxuICAgICAgaW1nQm91bmRzLmdldFRvcFJpZ2h0KClcbiAgICApO1xuICAgIGxldCB3aWR0aCA9IHRoaXMudmlld2VyLnZpZXdwb3J0Ll9jb250YWluZXJJbm5lclNpemUueCAtIHRvcFJpZ2h0Lng7XG4gICAgY29uc3QgeCA9XG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5fY29udGFpbmVySW5uZXJTaXplLnggLVxuICAgICAgd2lkdGggK1xuICAgICAgVmlld2VyT3B0aW9ucy5vdmVybGF5cy5jYW52YXNHcm91cE1hcmdpbkluUGFnZVZpZXc7XG5cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICB3aWR0aCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZWN0KHtcbiAgICAgIHg6IHgsXG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
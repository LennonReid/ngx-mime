export class StylesBuilder {
    constructor(stylesXml) {
        this.stylesXml = stylesXml;
    }
    build() {
        const textStyles = new Map();
        if (this.stylesXml.TextStyle) {
            this.stylesXml.TextStyle.forEach((textStyle) => {
                textStyles.set(textStyle.$.ID, {
                    fontStyle: textStyle.$.FONTSTYLE,
                });
            });
        }
        return textStyles;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9hbHRvL3N0eWxlcy5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLFNBQWM7UUFBZCxjQUFTLEdBQVQsU0FBUyxDQUFLO0lBQUcsQ0FBQztJQUV0QyxLQUFLO1FBQ0gsTUFBTSxVQUFVLEdBQTJCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtnQkFDbEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDN0IsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDakMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRTdHlsZSB9IGZyb20gJy4uLy4uL2FsdG8tc2VydmljZS9hbHRvLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlc0J1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0eWxlc1htbDogYW55KSB7fVxuXG4gIGJ1aWxkKCk6IE1hcDxzdHJpbmcsIFRleHRTdHlsZT4ge1xuICAgIGNvbnN0IHRleHRTdHlsZXM6IE1hcDxzdHJpbmcsIFRleHRTdHlsZT4gPSBuZXcgTWFwKCk7XG4gICAgaWYgKHRoaXMuc3R5bGVzWG1sLlRleHRTdHlsZSkge1xuICAgICAgdGhpcy5zdHlsZXNYbWwuVGV4dFN0eWxlLmZvckVhY2goKHRleHRTdHlsZTogYW55KSA9PiB7XG4gICAgICAgIHRleHRTdHlsZXMuc2V0KHRleHRTdHlsZS4kLklELCB7XG4gICAgICAgICAgZm9udFN0eWxlOiB0ZXh0U3R5bGUuJC5GT05UU1RZTEUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0U3R5bGVzO1xuICB9XG59XG4iXX0=
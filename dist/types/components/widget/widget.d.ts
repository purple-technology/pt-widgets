export declare class Widget {
    private el;
    class: string;
    strategy: string;
    height: string;
    width: number;
    data: [{
        date: string;
        gain: number;
    }?];
    name: string;
    currency: [string?];
    gain: number;
    validateName(newValue: string): void;
    handleWindowResize(): void;
    componentDidLoad(): void;
    componentDidRender(): void;
    calculateSize(): void;
    getData(): void;
    generateChart(): void;
    render(): any;
}

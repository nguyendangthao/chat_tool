class PaginatedResult {
    public page_number: number;
    public page_size: number;
    public total_count: number;
    public total_pages: number;
    public items: Array<any>;

    constructor(page_number: number, page_size: number, items: Array<any>) {
        this.page_number = page_number || 1;
        this.page_size = page_size || 10;
        this.total_count = items.length;
        this.total_pages = Math.ceil(items.length / this.page_size);
        this.items = items.slice((this.page_number - 1) * this.page_size,
            (this.page_number - 1) * this.page_size + this.page_size)
    }
}

export default PaginatedResult;

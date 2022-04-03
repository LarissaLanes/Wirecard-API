

export class Product {
    constructor(
        private id: string,
        private seller: string,
        private title: string,
        private price: string,
        private description: string
    ){}

    public getId(): string{
        return this.id;
    }

    public getSeller(): string{
        return this.seller;
    }

    public getTitle(): string{
        return this.title;
    }

    public getPrice(): string{
        return this.price;
    }

    public getDescription(): string{
        return this.description;
    }

    
}

export type ProductInput = {
    seller: string,
    title : string,
    price : string,
    description: string
}
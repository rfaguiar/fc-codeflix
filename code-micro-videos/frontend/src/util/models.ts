export interface ListResponse<T> {
    data: T[];
    readonly links: {
        readonly first: string;
        readonly last: string;
        readonly prev: string | null;
        readonly next: string | null
    };
    readonly meta: {
        readonly current_page: number;
        readonly from: number;
        readonly last_page: number;
        readonly path: string;
        readonly per_page: number;
        readonly to: number;
        readonly total: number
    }
}

interface Base {
    readonly id: string
}

interface Timestamped {
    readonly deleted_at: string;
    readonly created_at: string;
    readonly updated_at: string
}

export interface Category extends Base, Timestamped {
    name: string;
    description: string;
    is_active: boolean
}

export interface CastMember extends Base, Timestamped {
    name: string;
    type: string
}

export interface Genre extends Base, Timestamped {
    name: string;
    is_active: boolean;
    categories: Category[]
}
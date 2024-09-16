export interface Event {
    id: number;
    title: string;
    date: string;
}

export interface EventFormProps {
    initialTitle?: string;
    initialDate?: string;
    onSave: (title: string, date: string) => void;
}

export interface EventListProps {
    events: Array<{ id: number; title: string; date: string }>;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}
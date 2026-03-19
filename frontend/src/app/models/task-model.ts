
export type StatusType = 'NOT_STARTED' | 'PENDING' | 'COMPLETED';

export interface TaskModel {
    taskId: number;
    title: string;
    description: string;
    status: StatusType;
}

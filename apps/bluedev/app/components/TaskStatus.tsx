"use client";
export interface TaskStatus {
    task_id: string;
    task: string;
    request_id: string;
    is_complete: boolean;
    is_pending: boolean;
    errors: string[];
}

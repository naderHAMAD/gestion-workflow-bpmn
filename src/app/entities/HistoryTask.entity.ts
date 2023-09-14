export class HistoryTask {
    id: string|undefined;
    processInstanceId: string|undefined;
    processDefinitionKey: string|undefined;
    durationInMillis: number|undefined;
    startTime: Date|undefined;
    endTime: Date|undefined;
    name: string|undefined;
    priority: number|undefined;
    parentTaskId: string|undefined;
    deleteReason: string|undefined;
    taskDefinitionKey: string|undefined;
  }
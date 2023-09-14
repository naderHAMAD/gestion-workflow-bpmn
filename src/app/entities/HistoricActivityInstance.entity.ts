export class HistoricActivityInstance {
    id: string|undefined;
    processInstanceId: string|undefined;
    processDefinitionId: string|undefined;
    activityName: string|undefined;
    activityType: string|undefined;
    startTime: Date|undefined;
    endTime: Date|undefined;
    durationInMillis: number|undefined;
}
import { EventEntity } from './event-database-entity';
import { Mapper } from 'src/app/domain/base/mapper';
import { EventModel } from 'src/app/domain/models/event.model';
import { isString } from 'util';


export class EventDataBaseRespositoryMapper implements Mapper<EventEntity, EventModel>{

    mapFrom(param: EventEntity): EventModel {
        return {
            id: param.id,
            title: param.title,
            description: param.description,
            startTime: new Date(param.startTime),
            endTime: new Date(param.startTime),
            allDay: param.allDay,
        };
    }

    mapTo(param: EventModel): EventEntity {
        return {
            id: param.id,
            title: param.title,
            description: param.description,
            startTime: new Date(param.startTime).toISOString(),
            endTime:new Date(param.endTime).toISOString(),
            allDay: param.allDay,
        };
    }
}
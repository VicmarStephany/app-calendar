import { EventEntity } from './event-database-entity';
import { Mapper } from 'src/app/domain/base/mapper';
import { EventModel } from 'src/app/domain/models/event.model';


export class EventDataBaseRespositoryMapper implements Mapper<EventEntity, EventModel>{

    mapFrom(param: EventEntity): EventModel {
        return {
            id: param.id,
            title: param.title,
            description: param.description,
            startTime: param.startTime,
            endTime: param.endTime,
            allDay: param.allDay,
        };
    }

    mapTo(param: EventModel): EventEntity {
        return {
            id: param.id,
            title: param.title,
            description: param.description,
            startTime: param.startTime,
            endTime: param.endTime,
            allDay: param.allDay,
        };
    }
}
import { EventMockEntity } from './event-mock-entity';
import { Mapper } from 'src/app/domain/base/mapper';
import { EventModel } from 'src/app/domain/models/event.model';

export class EventRepositoryMockMapper extends Mapper<EventMockEntity, EventModel> {

    mapFrom(param: EventMockEntity): EventModel {
        return {
            id: param.id,
            title: param.title,
            description: param.description,
            startTime: new Date(param.startTime),
            endTime: new Date(param.endTime),
            allDay: param.allDay,
        }
    }

    mapTo(param: EventModel): EventMockEntity {
        return {
            id: param.id,
            title: param.title,
            description: param.description,
            startTime: param.startTime.toDateString(),
            endTime: param.endTime.toDateString(),
            allDay: param.allDay,
        }
    }
}    
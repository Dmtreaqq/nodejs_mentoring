export default abstract class EntityDataMapperService {
    toService(dbObject: any) {
        return dbObject;
    }

    toDataBase(serviceObject: any) {
        return serviceObject;
    }
}

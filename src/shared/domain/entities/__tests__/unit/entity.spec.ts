
import e from "express";
import { Entity } from "../../entity";

type StubProps = {
  prop1: string;
  prop2: number;
  prop3: Date;
  prop4?: string;
}

const uuidValidate = (uuid: string): boolean => {
   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
class StubEntity extends Entity<StubProps> { }
describe('Entity unit testes', () => {

  it('should set props and id ', () => {
    const props: StubProps = { prop1: 'value1', prop2: 2, prop3: new Date(), prop4: 'value4' };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(entity._id).toBeDefined();
    expect(entity._id).toHaveLength(36);
    expect(uuidValidate(entity._id)).toBeTruthy();
  });


    it('should accept a valid uuid ', () => {
    const props: StubProps = { prop1: 'value1', prop2: 2, prop3: new Date(), prop4: 'value4' };
    const id = '6d38ebd9-5345-4d72-af1d-8ec9ed127235';
    const entity = new StubEntity(props, id);


    expect(entity._id).toBe(id);
    expect(entity.toJSON()).toStrictEqual({ id, ...props
  });
    });
});

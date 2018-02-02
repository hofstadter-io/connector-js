/* global test expect: true */

const Connector = require('./index');

const Foo = {
  name: "Foo",
  do: () => "doing something...",
}

const Boo = {
  name: "Casper",
  do: () => "being friendly",
  say: () => "Boooooooo!",
}

const Moo = {
  name: "Cow",
  say: () => "MoooOOOO",
  do: () => "doing that farm to table thing...",
}

test('new connector is empty', () => {
  let conn = new Connector.Connector();
  expect(conn.Items()).toEqual([]);
});

test('can add items to a connector', () => {
  let conn = new Connector.Connector();

  conn.Add(Foo);
  expect(conn.Items().length).toEqual(1);

  conn.Add(Boo,Moo);
  expect(conn.Items().length).toEqual(3);
});

test('can add connector to a connector', () => {
  let connA1 = new Connector.Connector();
  connA1.Add(Foo);
  let connA2 = new Connector.Connector();
  connA2.Add(Boo,Moo);
  connA1.Add(connA2);

  expect(connA1.Items().length).toEqual(3);
});

test('can get items from a connector', () => {
  let conn = new Connector.Connector(Foo,Boo,Moo);

  let spec1 = {
    name: "name",
  }
  let spec2 = {
    name: "name",
    do: () => "do",
  }
  let spec3 = {
    name: "name",
    say: () => "say",
  }

  expect(conn.Get(spec1).length).toEqual(3);
  expect(conn.Get(spec2).length).toEqual(3);
  expect(conn.Get(spec3).length).toEqual(2);
});


test('can Connect() items in a connector', () => {
  let conn = new Connector.Connector();
  conn.Add(Foo,Boo,Moo);

  let spec1 = {
    name: "name",
  }
  let spec2 = {
    name: "name",
    say: () => "say",
  }

  let multi1 = {
    things: [],
  };
  multi1.Connect = (connector) => {
    multi1.things = connector.Get(spec1)
  }

  let multi2 = {
    things: [],
  };
  multi2.Connect = (connector) => {
    multi2.things = connector.Get(spec2)
  }

  conn.Add(multi1, multi2);

  conn.Connect(conn);

  expect(multi1.things.length).toEqual(3);
  expect(multi2.things.length).toEqual(2);
});



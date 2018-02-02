# connectors-js
JavaScript implementation of the 'connectors' concept.

### Install

```
npm install connector-js

or

yarn add connector-js
```

### Example

While this is a single file example,
the same will work across directories
and packages.

```javascript
import Connector from 'connector-js';

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

let conn1 = new Connector(Foo);
let conn2 = new Connector(Boo,Moo,conn1);

let spec1 = {
  name: "name",
  do: () => "do",
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
multi1.doers: () => {
  multi1.things.forEach(item => item.do())
}

let multi2 = {
  things: [],
};
multi2.Connect = (connector) => {
  multi2.things = connector.Get(spec2)
}
multi2.convo: () => {
  multi2.things.forEach(item => item.say())
}


let conn = new Connector(conn2, multi1, multi2);

conn.Connect(conn);

multi1.doers();
multi2.convo();
```

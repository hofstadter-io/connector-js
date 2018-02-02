export class Connector {
  constructor(...items) {
    this.items = [];
    if (typeof items !== 'undefined' && items.length > 0) {
      this.Add(items);
    }
  }

  Add(...items) {
    items.forEach(item => {
      this.items.push(item);
      if (typeof item.Items !== 'undefined') {
        this.Add(item.Items());
      }
    });
  }

  Items() {
    return this.items;
  }

  Get(spec) {
    let ret = [];
    this.items.forEach(item => {
      let conforms = true;
      for (let prop in spec) {
        if (typeof item[prop] === 'undefined') {
          conforms = false;
          break;
        }
      }

      if (conforms === true) {
        ret.push(item);
      }
    });

    return ret;
  }

  Connect(connector) {
    this.items.forEach(item => {
      if (typeof item.Connect !== 'undefined') {
        item.Connect(connector);
      }
    });
  }
}

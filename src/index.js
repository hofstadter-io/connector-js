export class Connector {
  constructor(...items) {

    this.items = [];
    if (typeof items !== 'undefined' && items.length > 0) {
      this.Add(...items);
    }
  }

  Add(...items) {
    items.forEach(item => {
      if (typeof item !== 'undefined') {
        if (typeof item.Items !== 'undefined') {

          this.Add(...item.Items());

        } else {

          if (typeof item.length !== 'undefined' && items.length > 0) {
            this.Add(...item);
          } else {
            this.items.push(item);
          }

        }
      }
    });
  }

  Items() {
    return this.items;
  }

  Get(spec) {
    let ret = this.items.filter(item => {
      let conforms = true;
      for (let prop in spec) {
        if (typeof item[prop] === 'undefined') {
          conforms = false;
          break;
        }
      }
      return conforms
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

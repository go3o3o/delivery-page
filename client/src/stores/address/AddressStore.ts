import { action, observable, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class AddressStore {
  @observable address = '';

  @action
  setAddress(address: string) {
    this.address = address;
  }
}

export default AddressStore;

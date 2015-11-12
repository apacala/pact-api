import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Vouchers extends PactResource {
  constructor(pactAPI) {
    const path = '/vouchers';

    const methods = {
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['voucher_code'],
        path: '{voucher_code}',
      }),
    };

    super({pactAPI, path, methods});
  }
}

import onComplete from './onComplete';
import reducer from './reducer';

const order = [onComplete, reducer];

const orchestrate = (req, res) => {
  return order.reduce((acc, fn) => {
    return fn(req, acc);
  }, res);
};
export default orchestrate;

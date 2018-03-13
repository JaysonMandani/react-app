import { expect } from 'chai';
import { renderComponent } from 'helpers/TestHelper';
import { RecycleProcess } from './index';

describe('<RecycleProcess />', () => {

  const component = renderComponent(RecycleProcess);

  it('Renders with correct style', () => {
    const style = require('./style.css');
    expect(component.find(style.About)).to.exist;
  });

  it('Renders header with text', () => {
    expect(component.find('h4').text()).to.eql('RecycleProcess');
  });

});

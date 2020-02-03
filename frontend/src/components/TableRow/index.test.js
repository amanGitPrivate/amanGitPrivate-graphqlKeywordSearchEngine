import React from 'react';
import TableRow from './index';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

const keyWordObject = {
    name: ['name', 'id', 'users']
}

const modifyKeywordObject = jest.fn();

it('renders table row component with props', () => {
  shallow(<TableRow modifyKeywordObject={modifyKeywordObject} keyWordObject={keyWordObject} columnName={'name'} />);
});

it('renders table row component with delete keyword, add keyword, delete category button', () => {
    const wrapper = mount(<TableRow modifyKeywordObject={modifyKeywordObject} keyWordObject={keyWordObject} columnName={'name'} />);
    expect(wrapper.find("button")).toHaveLength(5);
});

it('renders a button to add keyword option', () => {
    const wrapper = mount(<TableRow modifyKeywordObject={modifyKeywordObject} keyWordObject={keyWordObject} columnName={'name'} />);
    expect(wrapper.find(".delete-keyword")).toHaveLength(1);
});

it('renders textbox to add keyword and button', () => {
    const wrapper = mount(<TableRow modifyKeywordObject={modifyKeywordObject} keyWordObject={keyWordObject} columnName={'name'} />);
    wrapper.find(".show-keyword-option").simulate("click");
    expect(wrapper.find(".add-keyword")).toHaveLength(1);
    expect(wrapper.find(".input-keywords")).toHaveLength(1);
});

it('clicks textbox action to add keyword', () => {
    const wrapper = mount(<TableRow modifyKeywordObject={modifyKeywordObject} keyWordObject={keyWordObject} columnName={'name'} />);
    wrapper.find(".show-keyword-option").simulate("click");
    wrapper.find("input").instance().value = "Fix failing test";
    expect(wrapper.find("input").instance().value).toEqual("Fix failing test");
    wrapper.find('input').simulate('change');
    wrapper.find(".add-keyword").simulate("click");
    expect(wrapper.find("button")).toHaveLength(6);
});


import React from 'react';
import renderer from 'react-test-renderer';
import TableComponent from '@shared/components/tableComponent';

describe('TableComponent', () => {
  const newItem = ({ id, name, values = [], icon = null }) => {
    return {
      id: id || name,
      name,
      values,
      icon,
    };
  };

  it('renders correctly', () => {
    const headers = [];
    const items = [];

    const component = renderer.create(
      <TableComponent
        headers={headers}
        items={items}
        title="some title"
        onSelect={jest.fn()}
        selectedItem={0}
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders items', () => {
    const headers = ['header 1'];
    const items = [
      newItem({ name: 'item 1' }),
    ];

    const component = renderer.create(
      <TableComponent
        headers={headers}
        items={items}
        title="some title"
        onSelect={jest.fn()}
        selectedItem={0}
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

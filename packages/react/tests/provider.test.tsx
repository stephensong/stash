// Packages
import React from 'react';
import { createStore, Store, createAction } from '@stash/core';
import { cleanup, render, fireEvent } from 'react-testing-library';

// Ours
import { Provider } from '../src/provider';
import { StoreContext } from '../src/context';

const Inc = createAction('INC', (count, _) => count + 1);
const Dec = createAction('DEC', (count, _) => count - 1);

const Counter = () => {
	const { state, dispatch } = React.useContext(StoreContext);

	return (
		<div>
			<button
				data-testid={'inc'}
				onClick={() => {
					dispatch(Inc, {});
				}}
			>
				+
			</button>
			<h1 data-testid={'count'}>{state}</h1>
			<button
				data-testid={'dec'}
				onClick={() => {
					dispatch(Dec, {});
				}}
			>
				-
			</button>
		</div>
	);
};

function renderWithStore(store?: Store) {
	store = store || createStore(0);
	return render(
		<Provider store={store}>
			<Counter />
		</Provider>
	);
}

describe('Provider', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders with defaults', () => {
		const { getByTestId } = renderWithStore();
		expect(getByTestId('count').textContent).toBe('0');
	});

	it('renders with a custom value', () => {
		const { getByTestId } = renderWithStore(createStore(10));
		expect(getByTestId('count').textContent).toBe('10');
	});

	it('re-renders when store changes', () => {
		const { getByTestId } = renderWithStore();

		expect(getByTestId('count').textContent).toBe('0');

		fireEvent.click(getByTestId('inc'));

		expect(getByTestId('count').textContent).toBe('1');

		fireEvent.click(getByTestId('inc'));
		expect(getByTestId('count').textContent).toBe('2');

		fireEvent.click(getByTestId('dec'));
		expect(getByTestId('count').textContent).toBe('1');

		fireEvent.click(getByTestId('dec'));
		expect(getByTestId('count').textContent).toBe('0');
	});
});

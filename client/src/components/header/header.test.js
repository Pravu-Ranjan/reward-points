import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from './header';

test('render header component with label', () => {
    render(<Header/>)
    const headerText = screen.getByText(/Reward Point/i)
    expect(headerText).toBeInTheDocument()
    expect(headerText).toHaveTextContent(/^Reward Point$/)
})
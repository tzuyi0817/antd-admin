import { renderComponent } from '@/__tests__/unit/render';
import Home from '@/pages/home';

describe('home page', () => {
  it('renders the correct content', () => {
    renderComponent(<Home />);
  });
});

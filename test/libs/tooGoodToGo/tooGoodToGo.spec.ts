import { TooGoodToGo } from '@libs/tooGoodToGo/tooGoodToGo';

describe('Too Good To Go', () => {
  const email = process.env.TOOGOODTOGO_EMAIL || 'my@email.com';
  const password = process.env.TOOGOODTOGO_PASSWORD || 'password';

  let tooGoodToGo: TooGoodToGo;

  beforeEach(() => {
    tooGoodToGo = new TooGoodToGo(email, password);
  });

  test('List Items', async () => {
    const items = await tooGoodToGo.listItems();

    expect(items.length).toBeGreaterThan(0);
  });
});

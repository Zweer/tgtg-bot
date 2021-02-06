import { Composer, Scenes } from 'telegraf';
import { ItemNotFoundException } from '@aws/dynamodb-data-mapper';

import { User } from '@models/user';

interface StartWizardSession extends Scenes.WizardSessionData {
  email: string;
  password: string;
}

type StartWizardContext = Scenes.WizardContext<StartWizardSession>;

export const startSceneId = 'start-wizard';

const startWizard = new Scenes.WizardScene<StartWizardContext>(
  startSceneId,
  async (ctx) => {
    const user: User = await User.get({ id: `${ctx.message.chat.id}` })
      .catch((error: ItemNotFoundException) => {
        console.error(error);
        console.log(error.name);

        return null;
      });

    if (user && user.accessToken && user.refreshToken) {
      try {
        const { user: userInfo } = await user.setTooGoodToGo();

        await ctx.reply(`Welcome back ${userInfo.name}`);

        return await ctx.scene.leave();
      } catch {
        // login expired
      }
    }

    ctx.scene.session.email = '';

    await ctx.reply('What\'s your email address?');

    return ctx.wizard.next();
  },
  new Composer<StartWizardContext>()
    .on('text', async (ctx) => {
      ctx.scene.session.email = ctx.message.text;

      await ctx.reply('Enter your password');

      return ctx.wizard.next();
    }),
  new Composer<StartWizardContext>()
    .on('text', async (ctx) => {
      const { email } = ctx.scene.session;
      const password = ctx.message.text;

      const user = Object.assign(new User(), {
        id: ctx.message.chat.id,
      });

      try {
        const { user: userInfo } = await user.createTooGoodToGo(email, password);
        await user.put();

        await ctx.reply(`Welcome ${userInfo.name}`);
      } catch {
        await ctx.reply('Invalid credentials!');
      }

      // eslint-disable-next-line no-return-await
      return await ctx.scene.leave();
    }),
);

export const startStage = new Scenes.Stage<StartWizardContext>([startWizard]);

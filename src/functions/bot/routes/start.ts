import { Composer, Scenes } from 'telegraf';

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
    const user = await User.retrieve(`${ctx.message.chat.id}`);

    if (user) {
      await ctx.reply(`Welcome back ${user.userInfo.name}`);

      // eslint-disable-next-line no-return-await
      return await ctx.scene.leave();
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

      const user = await User.create(`${ctx.message.chat.id}`, email, password);

      await ctx.reply(user ? `Welcome ${user.userInfo.name}` : 'Invalid credentials!');

      // eslint-disable-next-line no-return-await
      return await ctx.scene.leave();
    }),
);

export const startStage = new Scenes.Stage<StartWizardContext>([startWizard]);

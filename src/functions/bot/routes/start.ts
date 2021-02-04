import { Composer, Scenes } from 'telegraf';
import { User } from '../../../models/user';

interface StartWizardSession extends Scenes.WizardSessionData {
  email: string;
  password: string;
}

type StartWizardContext = Scenes.WizardContext<StartWizardSession>;

export const startSceneId = 'start-wizard';

const startWizard = new Scenes.WizardScene<StartWizardContext>(
  startSceneId,
  async (ctx) => {
    const user = await User.get({ item: { id: ctx.message.chat.id } });

    if (user) {
      await ctx.reply('User already exists');

      return ctx.scene.leave();
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
        email,
      });
      await user.put();

      await ctx.reply(`Email: ${email}\nPassword: ${password}`);

      return ctx.scene.leave();
    }),
);

export const startStage = new Scenes.Stage<StartWizardContext>([startWizard]);

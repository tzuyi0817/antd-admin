import { SvgIcon } from '@/components/common';
import { LanguageSwitcher, LayoutFooter } from '@/components/layout';
import { FormModeContent } from './components/form-mode-content';
import { FormModeProvider } from './providers/form-mode';

export default function Login() {
  return (
    <div
      className="flex h-full flex-col"
      style={{ backgroundImage: 'radial-gradient(rgb(255, 255, 255), rgb(230, 244, 255))' }}
    >
      <header className="flex items-center justify-between p-3">
        <div className="text-colorText flex flex-1 items-center">
          <SvgIcon
            name="react"
            className="mr-2 h-11 w-11"
          />
          <h1 className="m-0 text-xl font-medium">Antd Admin</h1>
        </div>

        <div className="flex items-center">
          <LanguageSwitcher
            size="large"
            className="px-2.75"
          />
        </div>
      </header>

      <div className="flex w-full flex-1 flex-col justify-center overflow-hidden px-6 py-10 xl:px-8">
        <div className="w-full sm:mx-auto md:max-w-md">
          <FormModeProvider>
            <FormModeContent />
          </FormModeProvider>
        </div>
      </div>

      <LayoutFooter className="my-3 w-full text-center" />
    </div>
  );
}

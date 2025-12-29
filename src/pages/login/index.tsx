import { Col, Row } from 'antd';
import { SvgIcon } from '@/components/common';
import { LayoutFooter } from '@/components/layout';
import { FormModeContent } from './components/form-mode-content';
import { FormModeProvider } from './providers/form-mode';

export default function Login() {
  return (
    <div>
      <header className="absolute top-3 right-3 left-3 z-10 flex h-11 items-center">
        <div className="text-colorText flex flex-1 items-center">
          <SvgIcon
            name="react"
            className="mr-2 w-11"
          />
          <h1 className="m-0 text-xl font-medium">Antd Admin</h1>
        </div>

        <div className="flex items-center">
          {/* <LanguageButton
            size="large"
            className="px-2.75"
          /> */}
        </div>
      </header>

      <div className="flex h-full items-center overflow-hidden">
        <Row className="h-screen w-full">
          <Col
            xs={24}
            sm={24}
            lg={24}
            className="relative flex! flex-col justify-center px-6 py-10 xl:px-8"
            style={{ backgroundImage: 'radial-gradient(rgb(255, 255, 255), rgb(230, 244, 255))' }}
          >
            <div className="w-full sm:mx-auto md:max-w-md">
              <FormModeProvider>
                <FormModeContent />
              </FormModeProvider>
            </div>

            <LayoutFooter className="absolute bottom-3 left-1/2 w-full -translate-x-1/2" />
          </Col>
        </Row>
      </div>
    </div>
  );
}

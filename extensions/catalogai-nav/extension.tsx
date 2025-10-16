import { reactExtension, NavMenu } from '@shopify/ui-extensions-react/admin';

export default reactExtension('admin.nav.menu.render', () => (
  <NavMenu>
    <NavMenu.Item label="Dashboard" destination="/" />
    <NavMenu.Item label="Feed Validation" destination="/validation" />
    <NavMenu.Item label="AI Enrichment" destination="/enrichment" />
    <NavMenu.Item label="Intent Tagging" destination="/tagging" />
    <NavMenu.Item label="Settings" destination="/settings" />
  </NavMenu>
));

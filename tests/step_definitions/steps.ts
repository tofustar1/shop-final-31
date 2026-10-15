const { I } = inject();

Given('я нахожусь на странице регистрации', () => {
  I.amOnPage('/register');
  I.wait(1);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value);
  I.wait(1);
});

When('нажимаю на кнопку', () => {
  I.click({css: 'form button'});
  I.wait(1);
});

Then('я вижу сообщение {string}', (name: string) => {
  I.see(name);
  I.wait(1);
});

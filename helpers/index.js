var isBuildingCard = false;
var tmpCard = {};
var tmpListCards = [];
const regexpList = {
  'message': /^(bot|user)::".*"$/,
  'quickReply': /^\[.*\]$/,
  'selectQuickReply': /^qr::[0-9]$/,
  'buttonTemplate': /^".*"::\[.*\]/,
  'selectButtonTemplate': /^bt::[0-9]$/,
  'selectCard': /^sc::[0-9]$/,
  'scrollCard': /^scroll::[0-9]$/,
}
const helpers = {
  helpers: {
    selected: (flow, name) => {
      const selected = flow === name ? 'selected="selected"' : '';
      return selected;
    },
    step: (step) => {
      const isTypingIndicator = step === '...';
      const isMessage = regexpList['message'].test(step);
      const isQuickReply = regexpList['quickReply'].test(step);
      const isSelectQuickReply = regexpList['selectQuickReply'].test(step);
      const isShowButtonTemplate = regexpList['buttonTemplate'].test(step);
      const isSelectButtonTemplate = regexpList['selectButtonTemplate'].test(step);
      const isSelectCard = regexpList['selectCard'].test(step);
      const isScrollCard = regexpList['scrollCard'].test(step);
      const isStartingCard = step === '!#';
      const isClosingCard = step === '#!';
      const isTimeToNextCard = step === '>'
      const data = step.split('::');
      const delay = 1500;
      const templateSelect = (...args) => `.fbMessenger(${args.join(', ')}, { delay: ${delay} })`;

      if (isClosingCard) {
        tmpListCards.push(tmpCard);
        tmpCard = {};
        const cards = `.fbMessenger('showGenericTemplate', ${JSON.stringify(tmpListCards)}, { delay: ${delay} })`;
        tmpListCards = [];
        isBuildingCard = false;
        return cards;
      }

      if (isTimeToNextCard) {
        tmpListCards.push(tmpCard);
        tmpCard = {};
        return;
      }

      if (isBuildingCard) {
        if (data[0] === 'buttons') {
          tmpCard[data[0]] = data[1].split('|');
        } else {
          tmpCard[data[0]] = data[1];
        }
        return;
      }

      if (isStartingCard) {
        tmpCard = {};
        isBuildingCard = true;
        return;
      }

      if (isTypingIndicator) {
        return templateSelect('"typingIndicator"');
      }

      if (isMessage) {
        return templateSelect('"message"', `"${data[0]}"`, data[1]);
      }

      if (isQuickReply) {
        return templateSelect('"showQuickReplies"', step);
      }

      if (isShowButtonTemplate) {
        return templateSelect('"showButtonTemplate"', data[0], data[1]);
      }

      if (isSelectQuickReply) {
        return templateSelect('"selectQuickReply"', data[1]);
      }

      if (isSelectButtonTemplate) {
        return templateSelect('"selectButtonTemplate"', data[1]);
      }

      if (isSelectCard) {
        return templateSelect('"selectGenericTemplate"', data[1]);
      }

      if (isScrollCard) {
        return templateSelect('"scrollGenericTemplate"', data[1]);
      }
    },
    stepList: (step) => {
      const isMessage = regexpList['message'].test(step);
      const isQuickReply = regexpList['quickReply'].test(step);
      const isSelectQuickReply = regexpList['selectQuickReply'].test(step);
      const isShowButtonTemplate = regexpList['buttonTemplate'].test(step);
      const isSelectButtonTemplate = regexpList['selectButtonTemplate'].test(step);
      const isSelectCard = regexpList['selectCard'].test(step);
      const isScrollCard = regexpList['scrollCard'].test(step);
      const isStartingCard = step === '!#';
      const isClosingCard = step === '#!';
      const data = step.split('::');
      var user = 'bot';
      var text = '';
      var type = '';

      if (isClosingCard) {
        text = 'Card with options';
        isBuildingCard = false;
      }

      if (isBuildingCard) return;

      if (isStartingCard) {
        isBuildingCard = true;
        return;
      }

      if (step === '...') type = 'Typing Indicator';

      if (isMessage) {
        user = data[0];
        type = 'Message';
        text = data[1];
      }

      if (isQuickReply) {
        type = 'Quick Reply';
        text = step;
      }

      if (isSelectQuickReply || isSelectButtonTemplate || isSelectCard) {
        type = 'Select';
        text = `Index: ${data[1]}`;
      }

      if (isShowButtonTemplate) {
        type = 'Button Template';
        text = `'${data[0]}'<br/>${data[1]}`;
      }

      if (isScrollCard) {
        type = 'Scroll';
        text = `To: ${data[1]} card`;
      }

      const stepBlock = `<div class="step"><div class="step__title">${user} - ${type}</div><div class="step__content">${text}</div></div>`;
      const endBlock = '<div class="step"><div class="step__title">End Flow</div></div>';
      return step !== '' ? stepBlock : endBlock;
    },
  }
};

module.exports = helpers;

type Action = {
  isExitAction?: boolean,
};

const ExampleExitAction = () => ({
  isExitAction: true,
});

ExampleExitAction.match = (action: Action) => (
  action && action.isExitAction === true
);

const PageAction = (type) => ({
  type,
  isPageAction: true,
});

PageAction.match = (action) => (
  action && action.isPageAction === true
);

const ExampleProfilePageAction = (type) => ({
  ...PageAction(type),
  isProfilePageAction: true,
});

ExampleProfilePageAction.match = (action) => (
  action && action.isProfilePageAction === true
);

const ExampleInfoAction = () => PageAction('InfoPage');

const ExampleNotifProfileAction = () => ExampleProfilePageAction('NotifProfilePage');

module.exports = {
  PageAction, ExampleInfoAction, ExampleNotifProfileAction, ExampleExitAction, ExampleProfilePageAction
};

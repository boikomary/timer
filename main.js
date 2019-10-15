import { Clock } from './clock.js';
import { Tabs } from './tabs.js';
import { StopwatchTimer } from './stopwatchTimer.js';
import { Timer } from './stopwatchTimer.js';
import { StopWatch } from './stopwatchTimer.js';

new Tabs().init('timer');
new Clock().init();
new StopwatchTimer(new Timer(300));
new StopwatchTimer(new StopWatch(0));
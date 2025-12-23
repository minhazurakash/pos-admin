import { ENUM_THEME_TYPES, themeTypes } from '@lib/enum/theme.enum';
import useTheme from '@lib/hooks/useTheme';
import { FaDesktop, FaMoon, FaSun } from 'react-icons/fa';

const themeIcons = {
  [ENUM_THEME_TYPES.SYSTEM]: <FaDesktop className="h-3 w-3" />,
  [ENUM_THEME_TYPES.LIGHT]: <FaSun className="h-3 w-3" />,
  [ENUM_THEME_TYPES.DARK]: <FaMoon className="h-3 w-3" />,
};

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div role="radiogroup" className="flex w-fit items-center gap-1 rounded-full border border-gray-300 p-1">
      {themeTypes.map((themeType) => {
        const isActive = theme === themeType;
        const label = `Switch to ${themeType.toLowerCase()} theme`;

        return (
          <button
            key={themeType}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            data-theme-switcher="true"
            data-active={isActive}
            title={label}
            onClick={() => setTheme(themeType)}
            className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
              isActive
                ? 'bg-gray-700 text-white'
                : 'text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
            }`}
          >
            {themeIcons[themeType]}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggler;

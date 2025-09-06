import React, { memo, useCallback, useMemo, useState } from 'react';
import { Combobox } from '@headlessui/react';
import * as styles from './SearchDropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon/Icon';
import SearchIcon from '@/shared/assets/icons/search.svg';

export enum SearchDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface SearchItem {
  id: string;
  name: string;
  category?: string;
  price?: number;
  image?: string;
}

interface SearchDropdownProps {
  items: SearchItem[];
  onSelect?: (item: SearchItem) => void;
  placeholder?: string;
  direction?: SearchDirection;
  className?: string;
  disabled?: boolean;
}

export const SearchDropdown = memo<SearchDropdownProps>(
  ({
    items,
    onSelect,
    placeholder = 'Поиск товаров...',
    direction = SearchDirection.DOWN,
    className = '',
    disabled: _disabled = false,
  }) => {
    const [query, setQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

    const filteredItems = useMemo(() => {
      if (!query) return items;

      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.category &&
            item.category.toLowerCase().includes(query.toLowerCase())),
      );
    }, [items, query]);

    const handleSelect = useCallback(
      (item: SearchItem) => {
        setSelectedItem(item);
        setQuery(item.name);
        onSelect?.(item);
      },
      [onSelect],
    );

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        if (selectedItem && event.target.value !== (selectedItem.name || '')) {
          setSelectedItem(null);
        }
      },
      [selectedItem],
    );

    const searchIcon = useMemo(() => <Icon Svg={SearchIcon} />, []);

    const mods = {
      [styles.up]: direction === SearchDirection.UP,
      [styles.down]: direction === SearchDirection.DOWN,
      [styles.left]: direction === SearchDirection.LEFT,
      [styles.right]: direction === SearchDirection.RIGHT,
    };

    return (
      <div className={classNames(styles['search-container'], {}, [className])}>
        <Combobox value={selectedItem} onChange={handleSelect} as="div">
          <div className={styles['combobox-container']}>
            <div className={styles['input-wrapper']}>
              <Combobox.Input
                className={styles.input}
                displayValue={(item: SearchItem) => item?.name || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
              />
              <Combobox.Button className={styles.button}>
                {searchIcon}
              </Combobox.Button>
            </div>

            <Combobox.Options
              className={classNames(styles.options, mods, [])}
              data-direction={direction}
              static={false}
              unmount={true}
              as="div"
            >
              {filteredItems.length === 0 && query !== '' ? (
                <div className={styles['no-results']}>
                  <div className={styles['no-results-text']}>
                    Товар &quot;{query}&quot; не найден
                  </div>
                  <div className={styles['no-results-subtext']}>
                    Попробуйте изменить запрос
                  </div>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    value={item}
                    className={({ active }) =>
                      classNames(styles.option, { [styles.active]: active }, [])
                    }
                  >
                    {({ selected }) => (
                      <div className={styles['option-content']}>
                        <div className={styles['option-main']}>
                          <div className={styles['option-name']}>
                            {item.name}
                          </div>
                          {item.category && (
                            <div className={styles['option-category']}>
                              {item.category}
                            </div>
                          )}
                        </div>
                        {item.price && (
                          <div className={styles['option-price']}>
                            {item.price} ₸
                          </div>
                        )}
                        {selected && (
                          <div className={styles['check-icon']}>✓</div>
                        )}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    );
  },
);

SearchDropdown.displayName = 'SearchDropdown';

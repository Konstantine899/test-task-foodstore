// src/shared/ui/SearchDropdown/SearchDropdown.tsx
import React, { memo, useState, useCallback, useMemo } from 'react';
import { Combobox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as styles from './SearchDropdown.module.scss';
import { Icon } from '@/shared/ui';
import SearchIcon from '@/shared/assets/icons/search.svg';

export enum SearchDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface SearchItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface SearchDropdownProps {
  items: SearchItem[];
  onSelect?: (item: SearchItem) => void;
  placeholder?: string;
  className?: string;
  direction?: SearchDirection;
}

export const SearchDropdown = memo<SearchDropdownProps>(({
  items,
  onSelect,
  placeholder = "Поиск товаров...",
  className = '',
  direction = SearchDirection.DOWN
}: SearchDropdownProps) => {
  const [query, setQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);


  const filteredItems = useMemo(() => {
    if (!query) return items.slice(0, 5);
    
    return items.filter((item) =>
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
  }, [items, query]);

  const handleSelect = useCallback((item: SearchItem | null) => {
    if (!item) return;
    setSelectedItem(item);
    setQuery(item.name || '');
    onSelect?.(item);
  }, [onSelect]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (selectedItem && event.target.value !== (selectedItem.name || '')) {
      setSelectedItem(null);
    }
  }, [selectedItem]);

  const searchIcon = useMemo(() => <Icon Svg={SearchIcon} />, []);

  const mods = { 
    [styles.up]: direction === SearchDirection.UP,
    [styles.down]: direction === SearchDirection.DOWN,
    [styles.left]: direction === SearchDirection.LEFT,
    [styles.right]: direction === SearchDirection.RIGHT
  }

  

  return (
    <div className={classNames(styles.searchContainer, {}, [className])}>
      <Combobox value={selectedItem} onChange={handleSelect} as="div">
        <div className={styles.comboboxContainer}>
          <div className={styles.inputWrapper}>
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
              <div className={styles.noResults}>
                <div className={styles.noResultsText}>
                  Товар "{query}" не найден
                </div>
                <div className={styles.noResultsSubtext}>
                  Попробуйте изменить запрос
                </div>
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    classNames(styles.option, { [styles.active]: active })
                  }
                >
                  {({ selected }) => (
                    <div className={styles.optionContent}>
                      <div className={styles.optionMain}>
                        <div className={styles.optionName}>
                          {item.name || 'Без названия'}
                        </div>
                        <div className={styles.optionCategory}>
                          {item.category}
                        </div>
                      </div>
                      <div className={styles.optionPrice}>
                        {item.price} ₸
                      </div>
                      {selected && (
                        <div className={styles.checkIcon}>
                          ✓
                        </div>
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
});

SearchDropdown.displayName = 'SearchDropdown';
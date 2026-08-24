import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText, Card, Toggle } from '@/components/ui';
import { colors, fontFamilies, radii } from '@/theme';

type PermissionCardProps = {
  description: string;
  enabled: boolean;
  icon: LucideIcon;
  label: string;
  onChange: (enabled: boolean) => void;
};

export function PermissionCard({
  description,
  enabled,
  icon: Icon,
  label,
  onChange,
}: PermissionCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.icon}>
        <Icon color={colors.accent} size={24} strokeWidth={1.5} />
      </View>
      <View style={styles.copy}>
        <AppText style={styles.label}>{label}</AppText>
        <AppText style={styles.description} tone="secondary">
          {description}
        </AppText>
      </View>
      <Toggle
        accessibilityLabel={`Permitir ${label}`}
        onValueChange={onChange}
        size="compact"
        value={enabled}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
  },
  icon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    backgroundColor: colors.background,
  },
  copy: { flex: 1, gap: 5 },
  label: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    lineHeight: 15,
  },
  description: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
});

import { Bell, Bluetooth, Mic, ShieldCheck, Wifi } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { PrivacyNotice } from '@/components/silent-voice';
import { AppText, Button } from '@/components/ui';
import {
  BrandLogo,
  InitialFlowScreen,
  PermissionCard,
} from '@/features/initial-flow/components';
import { fontFamilies, webNoOutline } from '@/theme';

type PermissionKey = 'bluetooth' | 'microphone' | 'notifications' | 'wifi';

const permissionItems = [
  {
    key: 'bluetooth' as const,
    label: 'Bluetooth',
    description: 'Conecte-se a dispositivos próximos.',
    icon: Bluetooth,
  },
  {
    key: 'microphone' as const,
    label: 'Microfone',
    description: 'Captura sua voz para comandos.',
    icon: Mic,
  },
  {
    key: 'notifications' as const,
    label: 'Notificações',
    description: 'Receba alertas e lembretes importantes.',
    icon: Bell,
  },
  {
    key: 'wifi' as const,
    label: 'Wi-Fi / Rede local',
    description: 'Melhora a comunicação e a resposta.',
    icon: Wifi,
  },
];

export default function Permissions() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<
    Record<PermissionKey, boolean>
  >({
    bluetooth: true,
    microphone: true,
    notifications: false,
    wifi: true,
  });

  const goToConnection = () => router.replace('/connection');

  return (
    <InitialFlowScreen background={null} contentStyle={styles.content}>
      <BrandLogo style={styles.logo} />
      <View style={styles.heading}>
        <AppText style={styles.title} variant="screenTitle">
          Permissões e{`\n`}conectividade
        </AppText>
        <AppText style={styles.subtitle} tone="secondary">
          Para operar com segurança e em tempo real,{`\n`}permita os acessos
          abaixo.
        </AppText>
      </View>

      <View style={styles.cards}>
        {permissionItems.map(({ description, icon, key, label }) => (
          <PermissionCard
            key={key}
            description={description}
            enabled={permissions[key]}
            icon={icon}
            label={label}
            onChange={(enabled) =>
              setPermissions((current) => ({ ...current, [key]: enabled }))
            }
          />
        ))}
      </View>

      <View style={styles.spacer} />
      <View style={styles.footer}>
        <View style={styles.buttons}>
          <Button
            contentStyle={styles.allowContent}
            iconSize={16}
            label="Permitir acessos"
            labelStyle={styles.buttonLabel}
            leftIcon={ShieldCheck}
            leftIconBackgroundColor="rgba(123, 228, 219, 0.5)"
            leftIconContainerSize={26}
            onPress={goToConnection}
            style={styles.allowButton}
          />
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={goToConnection}
            style={({ pressed }) => [
              styles.skip,
              webNoOutline,
              pressed && styles.pressed,
            ]}
          >
            <AppText style={styles.skipText} tone="accent">
              Pular
            </AppText>
          </Pressable>
        </View>
        <PrivacyNotice
          compact
          text="Seus dados são protegidos e não são compartilhados."
        />
      </View>
    </InitialFlowScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: Platform.select({ web: 75, default: 18 }),
    paddingBottom: 30,
  },
  logo: { alignSelf: 'center', marginBottom: 35 },
  heading: { alignItems: 'center', gap: 10 },
  title: {
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  cards: { gap: 12, marginTop: 35 },
  spacer: { flexGrow: 1, minHeight: 20 },
  footer: { alignItems: 'stretch', gap: 12 },
  buttons: { gap: 8 },
  allowButton: { minHeight: 42, height: 42 },
  allowContent: { gap: 10 },
  buttonLabel: { fontSize: 12, lineHeight: 22 },
  skip: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    lineHeight: 22,
  },
  pressed: { opacity: 0.68 },
});

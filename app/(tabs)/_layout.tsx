import { NativeTabs } from "expo-router/native-tabs";
import colors from "../../constants/colors";

export default function TabsLayout() {
  return (
    <NativeTabs
      tintColor={colors.lightGrey}
      labelStyle={{
        default: {
          fontWeight: "normal",
          color: colors.lightGrey,
        },
        selected: {
          fontWeight: "bold",
          color: colors.primaryBlue,
        },
      }}
      iconColor={{
        default: colors.lightGrey,
        selected: colors.primaryBlue,
      }}
    >
      <NativeTabs.Trigger name="index" disableAutomaticContentInsets={true}>
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon selectedColor={colors.primaryBlue} sf="list.bullet" md="checklist" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="week" disableAutomaticContentInsets={true}>
        <NativeTabs.Trigger.Label>Week</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="notes" disableAutomaticContentInsets={true}>
        <NativeTabs.Trigger.Label>Notes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="note.text" md="note_stack" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

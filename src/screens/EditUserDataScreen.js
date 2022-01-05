import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityComponent,
  TextInput,
  Switch,
  SafeAreaView,
  Picker,
  TouchableNativeFeedback,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import RadioButtonRN from 'radio-buttons-react-native';
import DatePicker from 'react-native-date-picker';
import WorkModification from '../components/Profile/WorkModification';

const EditUserDataScreen = ({navigation}) => {
  const question = navigation.state.params.question;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Ionicons size={30} name="chevron-back-outline"></Ionicons>
        </TouchableOpacity>

        <View
          style={{
            fontSize: 30,
            alignItems: 'center',
            justifyContent: 'center',

            flex: 1,
          }}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>{question}</Text>
        </View>
      </View>
      {
        //showContent(question)
      }
    </SafeAreaView>
  );
};

const showContent = (question) => {
  if (question == 'Work') {
    return <WorkModification />;
  }

  if (question == 'Job Title') {
    const [jobtitle, setJobtitle] = useState('');
    return (
      <>
        <TextInput
          value={jobtitle}
          onChangeText={(jobtitle) => setJobtitle(jobtitle)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Your jobtitle"
          style={styles.inputElement}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'School') {
    const [school, setSchool] = useState('');
    return (
      <>
        <TextInput
          value={school}
          onChangeText={(school) => setSchool(school)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Your school"
          style={styles.inputElement}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Education Level') {
    const data = [
      {
        label: 'Highschool',
      },
      {
        label: 'Undergraduate',
      },
      {
        label: 'Postgraduate',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Religion') {
    const data = [
      {
        label: 'Budism',
      },
      {
        label: 'Muslim',
      },
      {
        label: 'Other',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }
  if (question == 'Hometown') {
    const [hometown, setHometown] = useState('');
    return (
      <>
        <TextInput
          value={hometown}
          onChangeText={(hometown) => setHometown(hometown)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Your Hometown"
          style={styles.inputElement}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Name') {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    return (
      <>
        <TextInput
          value={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="First Name"
          style={styles.inputElement}
        />
        <TextInput
          value={lastName}
          onChangeText={(firstName) => setLastName(lastName)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Last Name"
          style={styles.inputElement}
        />
      </>
    );
  }
  if (question == 'Gender') {
    const data = [
      {
        label: 'Male',
      },
      {
        label: 'Female',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Location') {
    const [location, setLocation] = useState('');
    return (
      <>
        <TextInput
          value={location}
          onChangeText={(location) => setLocation(location)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Your Location"
          style={styles.inputElement}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Ethnicity') {
    const data = [
      {
        label: 'Asian',
      },
      {
        label: 'White',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={2}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Height') {
    const [selectedValue, setSelectedValue] = useState('java');
    return (
      <>
        <View style={{alignItems: 'center', flex: 1}}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 30, width: '80%'}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="5.5" value="5.5" />
            <Picker.Item label="5.6" value="5.6" />
            <Picker.Item label="5.7" value="5.7" />
            <Picker.Item label="5.8" value="5.8" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
            flex: 1,
          }}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Age') {
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    return (
      <>
        <View styles={{justifyContent: 'center'}}>
          <Text>Pick Your DOB</Text>
          <DatePicker
            date={dateOfBirth}
            onDateChange={setDateOfBirth}
            mode="date"
            style=""
          />
          <Text>Your Age </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
            <Text style={{margin: 20}}>Visible</Text>
            <Switch
              trackColor={{false: '#767577', true: 'lightgreen'}}
              thumbColor={isEnabled ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleVisibleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </>
    );
  }

  if (question == 'Children') {
    const data = [
      {
        label: 'Dont have children',
      },
      {
        label: 'Have children',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={2}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Family Plan') {
    const data = [
      {
        label: 'Want children',
      },
      {
        label: 'Dont want children',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Drink') {
    const data = [
      {
        label: 'Sometimes',
      },
      {
        label: 'yes',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Smoke') {
    const data = [
      {
        label: 'Sometimes',
      },
      {
        label: 'yes',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }

  if (question == 'Drugs') {
    const data = [
      {
        label: 'Sometimes',
      },
      {
        label: 'yes',
      },
    ];
    return (
      <>
        <RadioButtonRN
          initial={1}
          data={data}
          selectedBtn={(e) => console.log(e)}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <Text style={{margin: 20}}>Visible</Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVisibleSwitch}
            value={isEnabled}
          />
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    height: 40,
  },
});

export default EditUserDataScreen;

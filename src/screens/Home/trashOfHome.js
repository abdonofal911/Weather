{
  /* <View
        style={[
          styles.searchContainer,
          {backgroundColor: showSearch ? Colors.label : 'transparent'},
        ]}>
        <View style={styles.textInputContainer}>
          {showSearch ? (
            <TextInput
              placeholder="Search City"
              placeholderTextColor={Colors.gray}
              style={styles.textInput}
            />
          ) : null}

          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowSearch(!showSearch)}>
            {!showSearch ? (
              <AntDesign name="search1" size={24} />
            ) : (
              <AntDesign name="close" size={24} />
            )}
          </TouchableOpacity>
        </View>
        {locations.length > 0 && showSearch ? (
          <View>
            <FlatList
              data={locations}
              keyExtractor={index => index}
              renderItem={() => (
                <TouchableOpacity>
                  <Text>Cairo , egypt</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                backgroundColor: 'red',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 15,
              }}
            />
          </View>
        ) : null}
      </View> */
}
